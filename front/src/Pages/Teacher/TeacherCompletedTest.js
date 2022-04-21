
import Page from '../../components/Page';
import { SubmittedTestTable } from '../../components/teacher';
import Navbar from '../../components/teacher/navbar/Navbar';



export default function SubmittedTestPage() {
    return (
    <Page title="Examify | Completed Test">
        <Navbar isHome={false}/>
        <SubmittedTestTable isMain={false}/>
    </Page>
    );
}