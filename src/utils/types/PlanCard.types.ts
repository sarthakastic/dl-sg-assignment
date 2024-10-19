export interface Description {
  icon: string;
  text: string;
}
export interface PlanInterface {
  id: number;
  title: string;
  description: Description[];
  price: number;
}

export interface PlanCardInterface {
  planInfo: PlanInterface;
  isSelected: boolean;
  onSelect: () => void;
}
