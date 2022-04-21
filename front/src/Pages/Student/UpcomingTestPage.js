
import Page from '../../components/Page';
import { UpcomingTestTable } from '../../components/student/main';
import Navbar from '../../components/student/navbar/Navbar';



export default function UpcomingTestPage() {

    return (
    <Page title="Examify | Upcoming Test">
        <Navbar isHome={false}/>
        <UpcomingTestTable isMain={false}/>
    </Page>
    );
}