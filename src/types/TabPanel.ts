export interface TabPanel {
  [key: string]: TabPanelTab;
}

export type TabPanelTab = {
  id: string;
  name: string;
};
