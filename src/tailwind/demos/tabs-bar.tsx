import { Tab, TabList, TabPanel, Tabs } from '@untitled-starter/components/application/tabs/tabs'
import { Specimen } from '@/tailwind/specimen'
import type { ComponentMetadata } from '@/registry/types'

export const metadata: ComponentMetadata = {
  title: 'Tabs',
  slug: 'tabs',
  category: 'dashboards',
  tags: ['untitled-ui', 'tabs', 'application'],
  description: 'Underline tabs from the starter application set.',
  dateAdded: '2026-09-08',
  notes: 'vendor/.../components/application/tabs/tabs.tsx',
}

export default function TabsBar() {
  return (
    <Specimen>
      <Tabs defaultSelectedKey="overview">
        <TabList type="underline">
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>
        <TabPanel id="overview" className="pt-5 text-sm text-tertiary">
          Occupancy for Ward B stays on the night board.
        </TabPanel>
        <TabPanel id="activity" className="pt-5 text-sm text-tertiary">
          Three reviews since 02:14.
        </TabPanel>
        <TabPanel id="settings" className="pt-5 text-sm text-tertiary">
          Shift handoff is written, not slid.
        </TabPanel>
      </Tabs>
    </Specimen>
  )
}
