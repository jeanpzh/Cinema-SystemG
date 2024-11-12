import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";

interface Props {
  title: string;
  showAddDialog: () => void;
  buttonLabel: string;
}

function HeaderList({ title, showAddDialog, buttonLabel }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <Button
        label={buttonLabel}
        icon={<FaPlus className="text-white" />}
        onClick={showAddDialog}
        className="flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
      />
    </div>
  );
}

export default HeaderList;
