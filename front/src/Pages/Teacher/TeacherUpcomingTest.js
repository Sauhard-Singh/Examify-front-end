import Page from '../../components/Page';
import { UpcomingTestTable } from '../../components/teacher';
import Navbar from '../../components/teacher/navbar/Navbar';



export default function UpcomingTestPage() {

    return (
    <Page title="Examify | Upcoming Test">
        <Navbar isHome={false}/>
        <UpcomingTestTable isMain={false}/>
    </Page>
    );
}