# Client 

Download Expo Go on your phone
Ensure that your devices are connected to the same network

To set up this project:
```bash
npm install --legacy-peer-deps
npx expo start
```

To update the SDK:
```bash
npm install expo@{version number}
npx expo install --check
npx expo start
```

To update the SDK:
```bash
npm install expo@{version number}
npx expo install --check
npx expo start
```

## Client server communication setup
1. Copy `.env.example` to `.env`
2. Find your IP address:
   - Windows: Run `ipconfig` and use IPv4 Address under "Wireless LAN adapter Wi-Fi" and append `:8000`
   - Mac/Linux: Run `ifconfig` or `ip addr`
3. Update `EXPO_PUBLIC_API_URL` in `.env` with your IP