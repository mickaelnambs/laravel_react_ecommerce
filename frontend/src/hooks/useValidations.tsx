import { ReactNode } from 'react';

interface ValidationErrors {
   [key: string]: string[];
}

export default function useValidations(errors: ValidationErrors | null, field: string): ReactNode {
   const renderErrors = (field: string) => (
       errors?.[field]?.map((error: string, index: number) => (
           <div key={index} className="text-white my-2 rounded p-2 bg-danger">
               {error}
           </div>
       ))
   );

   return renderErrors(field);
}