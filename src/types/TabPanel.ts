export interface TabPanel {
  [key: string]: TabPanelTab;
}

export type TabPanelTab = {
  id: number;
  name: string;
};
