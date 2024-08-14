import {
  RefContextProvider,
  PrintContextProvider,
  DragContextProvider,
  CanvasContextProvider,
  AlterContextProvider
} from './context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RefContextProvider>
        <AlterContextProvider>
          <CanvasContextProvider> 
            <PrintContextProvider>
              <DragContextProvider>
                <body >{children}</body>
              </DragContextProvider>
            </PrintContextProvider>
          </CanvasContextProvider>     
        </AlterContextProvider>
      </RefContextProvider>

    </html>
  );
}
