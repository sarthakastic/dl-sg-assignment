export interface Section {
  content: React.ReactNode;
}

export interface DynamicSectionLayoutInterface {
  heading: string;
  subheading: string;
  sections: Section[];
}
