import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'Admin' | 'Member';
  username: string;
}

export interface CustomRequest extends Request {
  user?: AuthenticatedUser;
}

export const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Authorization denial: Missing token.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser;

    // Direct sanity cross-reference against structural tracking layer
    const { data: userRecord, error } = await supabase
      .from('users')
      .select('id, email, role, username')
      .eq('id', decoded.id)
      .single();

    if (error || !userRecord) {
      res.status(401).json({ success: false, message: 'Authentication structural mismatch. Revoking access.' });
      return;
    }

    req.user = userRecord as AuthenticatedUser;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token.', error });
  }
};

export const authorizeRoles = (...roles: ('Admin' | 'Member')[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: 'RBAC Access Denied: Insufficient cryptographic clearance.' });
      return;
    }
    next();
  };
};
