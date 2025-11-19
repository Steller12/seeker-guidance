import { HeroBanner } from './components/HeroBanner'
import { ProfileFlowProvider } from './context/ProfileFlowContext'
import { ConversationSection } from './sections/ConversationSection'
import { ResultsOverlay } from './sections/ResultsOverlay'

const App = () => {
  return (
    <ProfileFlowProvider>
      <main className="app-shell">
        <HeroBanner />
        <ConversationSection />
        <ResultsOverlay />
      </main>
    </ProfileFlowProvider>
  )
}

export default App


