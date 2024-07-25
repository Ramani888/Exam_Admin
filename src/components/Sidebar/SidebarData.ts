import HomeIcon from "@mui/icons-material/Home";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import CategoryIcon from '@mui/icons-material/Category'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GradingIcon from '@mui/icons-material/Grading';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group';
import SaveAsIcon from '@mui/icons-material/SaveAs'

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    Icon: HomeIcon,
  },
  {
    title: "Question Bank",
    path: "/question-bank",
    Icon: LibraryBooksIcon,
    subNav: [
      {
        title: "Subject",
        path: "/question-bank/subject",
        Icon: DashboardIcon,
      },
      {
        title: "Topic",
        path: "/question-bank/topic",
        Icon: DashboardIcon,
      },
      {
        title: "Subjective Questions",
        path: "/question-bank/subjective-questions",
        Icon: DashboardIcon,
      },
      {
        title: "Objective Questions",
        path: "/question-bank/objective-questions",
        Icon: DashboardIcon,
      },
    ],
  },
  {
    title: "Exam Management",
    path: "/candidates",
    Icon: SaveAsIcon,
    subNav: [
      {
        title: "Exam Creation",
        path: "/exam-management/exam-creation",
        Icon: DashboardIcon,
      },
      {
        title: "Exam Scheduler",
        path: "/exam-management/exam-scheduler",
        Icon: DashboardIcon,
      },
      {
        title: "Exam Proctoring",
        path: "/exam-management/exam-proctoring",
        Icon: DashboardIcon,
      },
    ],
  },
  {
    title: "Candidates",
    path: "/candidates",
    Icon: GroupIcon,
    subNav: [
      {
        title: "Batch",
        path: "/candidates/batch",
        Icon: DashboardIcon,
      },
      {
        title: "Candidates Data",
        path: "/candidates/candidate-data",
        Icon: DashboardIcon,
      },
      {
        title: "Contact",
        path: "/candidates/contact",
        Icon: DashboardIcon,
      },
    ],
  },
];
