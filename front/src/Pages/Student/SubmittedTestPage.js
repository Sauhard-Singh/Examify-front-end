
import Page from '../../components/Page';
import {SubmittedTestTable  } from '../../components/student/main';
import Navbar from '../../components/student/navbar/Navbar';



export default function SubmittedTestPage() {
    return (
    <Page title="Examify | Upcoming Test">
        <Navbar isHome={false}/>
        <SubmittedTestTable isMain={false}/>
    </Page>
    );
}