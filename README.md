# HashSuite - Professional Hash Generation and Verification

A modern, secure, and user-friendly web application for generating and verifying cryptographic hashes using industry-standard algorithms. All processing happens entirely in your browser—your data never leaves your device.

##  Features

**HashSuite** provides a professional interface for working with four of the most secure and widely adopted cryptographic hash algorithms in the world today:

### Supported Algorithms

| Algorithm | Output | Security Level | Use Case |
|-----------|--------|-----------------|----------|
| **SHA-256** | 256 bits | Very High | Digital signatures, SSL/TLS certificates, blockchain (Bitcoin) |
| **SHA-512** | 512 bits | Excellent | Long-term archival, high-security applications, password hashing |
| **SHA3-256** | 256 bits | Excellent | Modern cryptographic applications, quantum-resistant hashing, NIST standard |
| **BLAKE2b** | 512 bits | Excellent | High-performance hashing, file integrity, real-time applications |

### Core Functionality

- **Hash Generation**: Convert any text input into a secure cryptographic hash using your chosen algorithm
- **Hash Verification**: Verify whether a provided hash matches the computed hash of your input text
- **Dual Mode Interface**: Switch between generation and verification modes for each algorithm
- **Copy-to-Clipboard**: Easily copy generated hashes with a single click
- **Clear Visual Feedback**: Immediate verification results with ✓ (match) or ✗ (mismatch) indicators
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Client-Side Processing**: All cryptographic operations happen in your browser using Web Crypto API
- **Zero Data Transmission**: No data is sent to any server—complete privacy and security

##  Security & Privacy

HashSuite prioritizes security and privacy in every aspect:

- **Client-Side Processing**: All hash generation and verification happens entirely in your browser using the Web Crypto API
- **No Server Communication**: Your input data never leaves your device—no data is transmitted to any server
- **Industry-Standard Algorithms**: Uses only the most secure, widely-adopted cryptographic algorithms
- **Open Source**: The source code is transparent and can be audited for security
- **No Cookies or Tracking**: The application does not store any personal data or use tracking mechanisms

##  Quick Start

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **pnpm** (version 8 or higher) - Package manager

### Installation

1. **Clone or extract the project**:
   ```bash
   cd HashSuite
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

### Running the Application

#### Development Mode

Start the development server with hot-reload enabled:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000/` (or the next available port if 3000 is in use).

#### Production Build

Create an optimized production build:

```bash
pnpm build
```

The built files will be available in the `dist/` directory.

#### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

##  Project Structure

```
HashSuite/
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── HashCard.tsx # Main hash card component
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useHashGenerator.ts
│   │   ├── lib/             # Utility functions
│   │   │   └── hashUtils.ts # Core hashing logic
│   │   ├── pages/           # Page components
│   │   │   └── Home.tsx     # Main application page
│   │   ├── contexts/        # React context providers
│   │   ├── App.tsx          # Main application component
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles and Tailwind configuration
│   └── index.html           # HTML template
├── server/                  # Server configuration (Express)
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # This file
```

##  Technology Stack

HashSuite is built with modern, industry-standard technologies:

- **React 19**: A JavaScript library for building user interfaces with components
- **TypeScript**: A typed superset of JavaScript for enhanced code quality and developer experience
- **Tailwind CSS 4**: A utility-first CSS framework for rapid UI development
- **shadcn/ui**: A collection of reusable, accessible React components
- **Vite**: A next-generation build tool and development server
- **Web Crypto API**: Native browser API for cryptographic operations
- **crypto-js**: Library for SHA3-256 and BLAKE2b algorithms

##  Usage Guide

### Generating a Hash

1. **Select an Algorithm**: Click on one of the four algorithm tabs (SHA-256, SHA-512, SHA3-256, or BLAKE2b)
2. **Enter Text**: Type or paste the text you want to hash into the input area
3. **Generate**: Click the "Generate Hash" button
4. **Copy**: Click the copy icon to copy the generated hash to your clipboard

### Verifying a Hash

1. **Select an Algorithm**: Choose the same algorithm that was used to generate the hash
2. **Enter Text**: Enter the original text that was hashed
3. **Switch to Verify Mode**: Click the "Verify" button in the mode toggle
4. **Enter Hash**: Paste the hash you want to verify
5. **Verify**: Click the "Verify Hash" button
6. **Review Result**: The application will display whether the hash matches (✓) or doesn't match (✗)

### Understanding the Algorithms

Each algorithm card displays important information:

- **Output Length**: The size of the hash output in bits
- **Security Level**: The cryptographic strength of the algorithm
- **Use Case**: Common applications where this algorithm is used
- **Description**: Detailed explanation of the algorithm and its characteristics

##  Algorithm Details

### SHA-256 (Secure Hash Algorithm 2, 256-bit)

SHA-256 is part of the SHA-2 family and is the industry standard for cryptographic hashing. It produces a 256-bit (32-byte) hash output and is widely used in digital signatures, SSL/TLS certificates, and blockchain applications like Bitcoin. SHA-256 is considered very secure and suitable for most applications.

**Use Cases**: Digital signatures, SSL/TLS certificates, blockchain, cryptocurrency, data integrity verification

### SHA-512 (Secure Hash Algorithm 2, 512-bit)

SHA-512 is also part of the SHA-2 family but produces a larger 512-bit (64-byte) hash output, providing enhanced security. It is suitable for long-term archival, high-security applications, and password hashing where maximum security is required.

**Use Cases**: Long-term archival, high-security applications, password hashing, HMAC construction

### SHA3-256 (Secure Hash Algorithm 3, 256-bit)

SHA3-256 is the newest member of the SHA family, approved by NIST as a standard. It uses a different design principle (sponge construction) compared to SHA-2 and is considered resistant to potential future attacks. SHA3-256 is ideal for modern cryptographic applications and is gaining adoption in new systems.

**Use Cases**: Modern cryptographic applications, quantum-resistant hashing, NIST-compliant systems, new protocol designs

### BLAKE2b (512-bit)

BLAKE2b is a high-performance cryptographic hash function that is faster than MD5, SHA-2, and SHA-3 while being at least as secure as SHA-3. It produces a 512-bit output and is ideal for performance-critical applications where speed is important without compromising security.

**Use Cases**: High-performance hashing, file integrity verification, password hashing, real-time applications, content-addressable storage

##  Important Security Notes

### Why Not SHA-1 or MD5?

SHA-1 and MD5 are **not included** in HashSuite because they are cryptographically broken and should not be used for further use. Both algorithms have known collision vulnerabilities that make them unsuitable for security-sensitive applications.

- **SHA-1**: Deprecated by NIST and major organizations due to collision attacks
- **MD5**: Broken and unsuitable for further use; collision attacks are practical

### Best Practices

1. **Choose the Right Algorithm**: For new applications, prefer SHA-256, SHA3-256, or BLAKE2b
2. **Use Salting for Passwords**: When hashing passwords, always use a salt and consider using dedicated password hashing algorithms like bcrypt or Argon2
3. **Verify Integrity**: Use hashes to verify data integrity by comparing hashes before and after transmission
4. **Keep Algorithms Updated**: Stay informed about cryptographic research and update your systems accordingly

##  Customization

### Modifying Colors

To customize the color scheme, edit `client/src/index.css` and modify the CSS variables in the `:root` section. The application uses OKLCH color format for better color consistency.

### Adding More Algorithms

To add additional hash algorithms:

1. Add the algorithm to `ALGORITHM_INFO` in `client/src/lib/hashUtils.ts`
2. Implement the hash generation function
3. Update the `generateHash` function to handle the new algorithm
4. The UI will automatically display the new algorithm

### Styling Components

The application uses Tailwind CSS for styling. Modify component styles by editing the className attributes in React components. For global styles, edit `client/src/index.css`.

##  Building for Production

To create a production-ready build:

```bash
pnpm build
```

This command will:

1. Build the React application with TypeScript type checking
2. Optimize and minify the code
3. Create static files in the `dist/` directory

The production build can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

##  Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.). Check the terminal output to see which port is being used.

### Dependencies Not Installing

If you encounter issues installing dependencies:

```bash
pnpm install --force
```

### Build Errors

If you encounter build errors:

1. Clear the cache: `rm -rf node_modules .pnpm-store`
2. Reinstall dependencies: `pnpm install`
3. Try building again: `pnpm build`

##  License

This project is provided as-is for educational and professional use. Feel free to modify and distribute as needed.

##  Contributing

Contributions are welcome! If you find bugs or have suggestions for improvements, please feel free to submit issues or pull requests.

## 📞 Support

For issues, questions, or suggestions, please refer to the project documentation or contact with me.

---

**HashSuite** - Professional Hash Generation and Verification  
Built with React, TypeScript, Tailwind CSS, and shadcn/ui  
All processing happens in your browser • No data is sent to any server

## Visual Representation
**Hash Generation**
<img width="1267" height="617" alt="Screenshot 2025-11-28 203750" src="https://github.com/user-attachments/assets/cc08136a-a979-470d-853a-d4b50edc6881" />
**Generated Hash Verification**
<img width="1265" height="614" alt="Screenshot 2025-11-28 203902" src="https://github.com/user-attachments/assets/67469001-6e7b-476a-aa68-83521ecbffd7" />
**Change Generated Hash value then check can it verify correctly or not**
<img width="1258" height="610" alt="Screenshot 2025-11-28 204016" src="https://github.com/user-attachments/assets/c50e9404-8905-421a-b971-e5f96e647549" />
