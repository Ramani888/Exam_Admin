
import AppSummaryCard from '../../components/AppSummaryCard/AppSummaryCard';
import { DashboardContainer, DashboardSummaryCardContainer } from './Dashboard.styled'
import useDashboard from './useDashboard';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ClassIcon from '@mui/icons-material/Class';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SubjectIcon from '@mui/icons-material/Subject';
import TopicIcon from '@mui/icons-material/Topic';
const Dashboard = () => {
  const {
    loading,
    dashboardData
  } = useDashboard();
  const AppSummaryCardData = [
    {
      cardTitle: 'Candidate',
      cardCount: dashboardData?.totalCandidate,
      Icon: PeopleIcon,
      path: '/candidates/candidate-data'
    },
    {
      cardTitle: 'Batch',
      cardCount: dashboardData?.totalBatch,
      Icon: ClassIcon,
      path: '/candidates/batch'
    },
    {
      cardTitle: 'Exam',
      cardCount: dashboardData?.totalExam,
      Icon: LibraryBooksIcon,
      path: '/exam-management/exam-creation'
    },
    {
      cardTitle: 'Schedule Exam',
      cardCount: dashboardData?.totalScheduleExam,
      Icon: CollectionsBookmarkIcon,
      path: '/exam-management/exam-scheduler'
    },
    {
      cardTitle: 'Objective Question',
      cardCount: dashboardData?.totalObjectiveQuestion,
      Icon: QuestionAnswerIcon,
      path: '/question-bank/objective-questions'
    },
    {
      cardTitle: 'Subjective Question',
      cardCount: dashboardData?.totalSubjectiveQuestion,
      Icon: QuestionAnswerIcon,
      path: '/question-bank/subjective-questions'
    },
    {
      cardTitle: 'Subject',
      cardCount: dashboardData?.totalSubject,
      Icon: SubjectIcon,
      path: '/question-bank/subject'
    },
    {
      cardTitle: 'Topic',
      cardCount: dashboardData?.totalTopic,
      Icon: TopicIcon,
      path: '/question-bank/topic'
    }
  ];
  return (
    <DashboardContainer>
      <DashboardSummaryCardContainer>
        {AppSummaryCardData?.map((item, index) => {
          return (
            <AppSummaryCard key={index} cardTitle={item?.cardTitle} cardCount={item?.cardCount} Icon={item?.Icon} path={item?.path} loading={loading} />
          )
        })}
      </DashboardSummaryCardContainer>
    </DashboardContainer>
  )
}

export default Dashboard