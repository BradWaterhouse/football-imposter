# Football Imposter

A mobile-first social deduction game where players try to identify imposters among them. Built with React as a Progressive Web App (PWA).

## 🎮 How to Play

1. **Setup**: Add 3+ player names and choose the number of imposters (1-3)
2. **Reveal**: Each player privately taps their name to see their role:
   - **Regular Players** see the name of a football player
   - **Imposters** see "IMPOSTER" and must blend in
3. **Discussion**: Players take turns saying words/phrases about the secret player
4. **Vote**: Try to identify and vote out the imposters!

## 🚀 Features

- **Mobile-First Design**: Optimized for touch devices and phone passing
- **PWA Support**: Installable on mobile devices for native-like experience
- **Privacy Protection**: Roles are hidden after viewing to prevent cheating
- **Player Memory**: Remembers players between games for quick replay
- **Professional UI**: Clean, modern design with smooth animations

## 🛠 Tech Stack

- **React 18** - UI framework
- **CSS3** - Styling with mobile-first responsive design
- **Service Workers** - PWA functionality and offline support
- **ES6+ JavaScript** - Modern JavaScript features

## 📱 Installation

### Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Production (PWA)
1. Visit the deployed app on your mobile device
2. Add to home screen when prompted
3. Launch like a native app!

## 🏗 Project Structure

```
src/
├── components/           # React components
│   ├── GameSetup.js     # Player setup screen
│   ├── RevealScreen.js  # Player selection grid
│   ├── RoleReveal.js    # Individual role reveal
│   ├── PlayerTile.js    # Player tile component
│   └── DiscussionScreen.js # Final discussion phase
├── hooks/
│   └── useGameState.js  # Game state management hook
├── utils/
│   └── gameUtils.js     # Game logic utilities
├── constants/
│   └── gameConstants.js # Game constants and rules
├── players.json         # Football player database
├── App.js              # Main app component
└── App.css             # Global styles
```

## 🎯 Game Rules

- **Minimum Players**: 3
- **Maximum Imposters**: Up to 3 (must be less than total players)
- **Objective**: Regular players try to identify imposters, imposters try to blend in

## 🔧 Customization

### Adding Players
Edit `src/players.json` to add more football players to the database.

### Styling
- Main styles in `src/App.css`
- Mobile-first approach with responsive breakpoints
- CSS custom properties for easy theming

### Game Rules
Modify constants in `src/constants/gameConstants.js` to adjust:
- Minimum players required
- Maximum imposters allowed
- Game messages and instructions

## 🌐 Browser Support

- **Mobile**: iOS Safari 12+, Chrome 80+, Samsung Internet 12+
- **Desktop**: Chrome 80+, Firefox 75+, Safari 12+, Edge 80+

## 📄 License

MIT License - feel free to use and modify for your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub.