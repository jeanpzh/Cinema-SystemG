import Button from './ButtonAdd'; // Asegúrate de que la ruta sea correcta

interface Props {
  title: string;
  showAddDialog: () => void;
  buttonLabel: string;
}

function HeaderList({ title, showAddDialog, buttonLabel }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>
      <Button onClick={showAddDialog}>
        {buttonLabel}
      </Button>
    </div>
  );
}

export default HeaderList;

