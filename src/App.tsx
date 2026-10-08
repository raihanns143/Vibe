import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import { Feed } from './components/feed/Feed';
import { PostModal } from './components/feed/PostModal';
import { MobileHeader } from './components/layout/MobileHeader';
import { MobileNav } from './components/layout/MobileNav';
import { SidebarLeft } from './components/layout/SidebarLeft';
import { SidebarRight } from './components/layout/SidebarRight';
import { ToastContainer } from './components/common/Toast';
import { LoadingScreen } from './components/common/LoadingScreen';

const BookmarksView = lazy(() =>
  import('./components/bookmarks/BookmarksView').then((module) => ({
    default: module.BookmarksView,
  })),
);
const ExploreView = lazy(() =>
  import('./components/explore/ExploreView').then((module) => ({ default: module.ExploreView })),
);
const MessagesView = lazy(() =>
  import('./components/messages/MessagesView').then((module) => ({ default: module.MessagesView })),
);
const NotificationsView = lazy(() =>
  import('./components/notifications/NotificationsView').then((module) => ({
    default: module.NotificationsView,
  })),
);
const ProfileView = lazy(() =>
  import('./components/profile/ProfileView').then((module) => ({ default: module.ProfileView })),
);
const SettingsView = lazy(() =>
  import('./components/settings/SettingsView').then((module) => ({ default: module.SettingsView })),
);

const AppContent = () => {
  const { activeTab } = useApp();

  const view = (() => {
    switch (activeTab) {
      case 'explore':
        return <ExploreView />;
      case 'notifications':
        return <NotificationsView />;
      case 'messages':
        return <MessagesView />;
      case 'bookmarks':
        return <BookmarksView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'home':
      default:
        return <Feed />;
    }
  })();

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1540px]">
        <SidebarLeft />

        <main className="min-w-0 flex-1 px-3 pb-24 pt-4 sm:px-5 md:pb-6 md:pt-6 lg:px-7">
          <div className="mx-auto w-full max-w-[920px]">
            <MobileHeader />
            <Suspense fallback={<LoadingScreen />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  {view}
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </div>
        </main>

        <SidebarRight />
      </div>

      <MobileNav />
      <PostModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
