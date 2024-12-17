export interface TabPanel {
  [key: string]: TabPanelTab;
}

export type TabPanelTab = {
  id: string;
  elementId?: string;
  name: string;
};
