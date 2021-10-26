import { Wrap } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { types } from "../../utils/materialsTypesData";
import { MaterialTypeComponent } from "./MaterialTypeComponent";

interface RadioValuesProps {
  setMaterialsType: Dispatch<SetStateAction<string[]>>;
  materialsType: string[];
}

export const OptionsMaterialsType = ({
  setMaterialsType,
  materialsType,
}: RadioValuesProps) => {
  return (
    <Wrap justify="space-evenly">
      {types.map((type: string, index: number) => (
        <MaterialTypeComponent
          index={index}
          type={type}
          materialsType={materialsType}
          setMaterialsType={setMaterialsType}
          key={index}
        />
      ))}
    </Wrap>
  );
};
