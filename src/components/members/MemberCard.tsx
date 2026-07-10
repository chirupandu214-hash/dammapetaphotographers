import { QRCodeCanvas } from "qrcode.react";

interface Props {
  member: any;
}

export default function MemberCard({
  member,
}: Props) {

  const verifyUrl =
    `${window.location.origin}/verify/${member.member_id}`;


  return (

    <div
      style={{
        width:"350px",
        padding:"20px",
        borderRadius:"15px",
        background:"#ffffff",
        boxShadow:"0 5px 20px rgba(0,0,0,.15)",
      }}
    >

      <h2>
        Dammapeta Photographers
      </h2>


      {member.photo && (

        <img
          src={member.photo}
          alt="Member"
          style={{
            width:"100px",
            height:"100px",
            borderRadius:"50%",
            objectFit:"cover",
          }}
        />

      )}


      <h3>
        {member.full_name}
      </h3>


      <p>
        ID :
        {member.member_id}
      </p>


      <p>
        Mobile :
        {member.mobile}
      </p>


      <p>
        Studio :
        {member.studio_name}
      </p>


      <p>
        Status :
        {member.status}
      </p>


      <QRCodeCanvas
        value={verifyUrl}
        size={120}
      />


    </div>

  );

}
