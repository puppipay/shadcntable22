import xlsx, {IJsonSheet} from "json-as-xlsx";

import { Person, people } from "./people";



export function downloadtoxls()
{

    let columns: IJsonSheet[] = [
        {
          sheet: "Persons",
          columns: [
            { label: "Person ID", value: "id" },
            { label: "First Name", value: "first_name" },
            { label: "Last Name", value: "last_name" },
            { label: "Email", value: "email" },
            { label: "Gender", value: "gender" },
            {
              label: "Date of Birth",
              value: (row) => new Date(row.date_of_birth as string).toLocaleDateString(),
            },
          ],
          content: people,
        },
      ];
    
      let settings = {
        fileName: "People Excel",
      };
    
      xlsx(columns, settings);

}

