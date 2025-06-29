# Planning Poker Frontend (Test task for Payme Swiss)

A React/Next.js Planning Poker application with WebSocket integration.

## �� Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: Zustand
- **Styling**: CSS Modules
- **Testing**: Jest, React Testing Library
- **WebSocket**: Socket.io Client
- **Theme**: Light/Dark mode with Context API

## ✨ Features

### ✅ Implemented

1. **Lobby System**
   - Username input (3-15 characters validation)
   - Create new room with UUID
   - Join existing room by UUID
   - Server connection indicator

2. **Game Room**
   - Display participants (up to 12 players)
   - Vote with cards (1, 2, 3, 5, 8, 13, ?, ☕️)
   - Reveal/hide votes
   - Timer with auto-reveal (45 seconds)
   - Reset votes (host only)

3. **UI Components**
   - Desktop-focused design
   - Dark/light theme
   - Participants sidebar
   - Modal windows
   - Connection status indicator

4. **Testing**
   - 70 unit tests, 100% pass rate
   - All UI components covered
   - Component-level testing

## 🏗️ Architecture

src/
├── app/ # Next.js App Router
│ ├── page.tsx # Main page with Lobby
│ └── room/[id]/ # Room page
├── components/
│ ├── ui/ # Reusable UI components
│ ├── Header/ # Room info header
│ ├── lobby/ # Entry modal
│ ├── layout/ # Participants sidebar
│ └── socketProvider/ # WebSocket provider
├── store/ # Zustand store
├── hooks/ # Custom hooks
├── context/ # React Context (theme)
├── types/ # TypeScript types
└── utils/ # Utilities (UUID generation)


## 🚀 Getting Started

### Install dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Testing
```bash
npm test              # Run unit tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## �� Configuration

### Backend
The app expects a NestJS backend on `http://localhost:3000` with WebSocket support.



## Testing

- **70 unit tests** covering all main components
- **100% pass rate** for all tests
- **Coverage**: Component rendering, props, state changes, event handlers

### Testing commands
```bash
npm test              # Unit tests only
npm run test:watch    # Interactive mode
npm run test:coverage # Coverage report
```

##  UI/UX Features

- **Desktop-focused design** - optimized for desktop screens
- **Dark/light theme** - toggle in header
- **Animations** - smooth transitions and effects
- **Status indicators** - connection, loading, errors

## �� WebSocket Events

### Outgoing events
- `create_room` - create room
- `join_room` - join room
- `vote` - cast vote
- `reset_votes` - reset votes
- `start_timer` - start timer
- `stop_timer` - stop timer

### Incoming events
- `room_update` - room state update
- `connect/disconnect` - connection status
- `error` - errors

## Requirements Compliance

✅ **2.1 Lobby View** - Room UUIDs, name input, no authentication  
✅ **2.2 Game Room** - Display participants and votes  
✅ **2.3 Voting** - Cards with values, reveal/hide  
✅ **2.4 Real-time** - WebSocket integration  
✅ **2.5 UI/UX** - Modern design, desktop version only  
✅ **2.6 Testing** - Unit test coverage  
