import { Cog8ToothIcon } from '@heroicons/react/20/solid';
import { JSX } from 'react';
import { useParams } from 'react-router-dom';
import LandlordDashboardLayout from '../../../layouts/LandlordDashboard.Layout';
import Analytics from './components/Analytics';
import BillingAndSubscription from './components/BillingAndSubscription';
import { ResponsiveTabSelector } from './components/common/ResponsiveTabSelector';
import Employees from './components/Employees';
import Home from './components/Home';
import Leads from './components/Leads';
import ManageProperties from './components/ManageProperties';
import Renters from './components/Renters';
import Setting from './components/Setting';
import Support from './components/Support';

const tabOptionsObject = {
    "home": "Home",
    "add-manage-properties": "Manage Properties",
    "leads": "Leads",
    "renters": "Renters",
    "employees": "Employees",
    "billing-and-subscription": "Billing & Subscription",
    "analytics": "Analytics",
    "support": "Support",
    "setting": <Cog8ToothIcon className='w-5 text-[#CC2222]' />,
};

// Components corresponding to each tab
const Components: Record<keyof typeof tabOptionsObject, JSX.Element> = {
    "support": <Support />,
    "analytics": <Analytics />,
    "billing-and-subscription": <BillingAndSubscription />,
    "employees": <Employees />,
    "renters": <Renters />,
    "leads": <Leads />,
    "add-manage-properties": <ManageProperties />,
    "home": <Home />,
    "setting": <Setting />,
};

const LandLordsDashboard = () => {
    const { tab = "home" } = useParams(); // Default to "my-housing" if no tab is in the URL
    const tabOptions = Object.keys(tabOptionsObject);

    const isValidTab = (value: string): value is keyof typeof Components => {
        return Object.keys(Components).includes(value);
    };
    return (
        <LandlordDashboardLayout>
            <div className="my-5">
                <ResponsiveTabSelector {...{ tabOptions, tab, tabOptionsObject }} />
                <div className="mx-5 md:mx-10">
                    {isValidTab(tab) ? Components[tab] : <div>Invalid tab</div>}
                </div>
            </div>
        </LandlordDashboardLayout>
    )
}

export default LandLordsDashboard

