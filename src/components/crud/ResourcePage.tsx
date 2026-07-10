import type { ResourceConfig } from "@/config/resources";


interface ResourcePageProps {
  resource: ResourceConfig;
}


export function ResourcePage({
  resource,
}: ResourcePageProps) {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold">
        {resource.title}
      </h1>

      <p className="mt-2">
        Manage {resource.title}
      </p>

    </div>
  );
}
