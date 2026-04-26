import { useCallback, useEffect, useRef } from 'react';

interface ScrollCanvasProps {
    totalFrames: number;
    framePath: string;
    scrollHeight?: number;
}

export default function ScrollCanvas({ totalFrames, framePath, scrollHeight = 500 }: ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const currentFrameRef = useRef(-1); // Start at -1 so frame 0 draws immediately on load
    const targetFrameRef = useRef(0);
    const rafRef = useRef<number>(0);

    // Resize canvas buffers only when window changes, NOT every frame
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
    }, []);

    // Draw frame on canvas (highly optimized, no layout recalculations)
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = imagesRef.current[frameIndex];

        if (!canvas || !ctx || !img) return false;

        // Clear the canvas buffer instead of resetting width/height
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
        if (imgRatio > canvasRatio) {
            sWidth = img.height * canvasRatio;
            sx = (img.width - sWidth) / 2;
        } else {
            sHeight = img.width / canvasRatio;
            sy = (img.height - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
        return true;
    }, []);

    // Calculate current frame from scroll position
    const getCurrentFrame = useCallback(() => {
        const container = containerRef.current;
        if (!container) return 0;
        const rect = container.getBoundingClientRect();
        const containerTop = -rect.top;
        const scrollableHeight = container.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, containerTop / scrollableHeight));
        return Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
    }, [totalFrames]);

    // Preload all frames
    useEffect(() => {
        const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);

        const loadBatch = (startIndex: number, batchSize: number) => {
            const end = Math.min(startIndex + batchSize, totalFrames);
            for (let i = startIndex; i < end; i++) {
                const img = new Image();
                img.src = `${framePath}${i + 1}.png`;
                img.onload = () => {
                    images[i] = img;
                    imagesRef.current = images;

                    // If the image that just loaded is the one we currently want to display,
                    // draw it immediately. This fixes fast-scrolling stops and mid-page refreshes.
                    if (i === targetFrameRef.current && currentFrameRef.current !== i) {
                        const success = drawFrame(i);
                        if (success) {
                            currentFrameRef.current = i;
                        }
                    }
                };
                img.onerror = () => {
                    // Skip failed frames silently
                };
            }
            if (end < totalFrames) {
                setTimeout(() => loadBatch(end, batchSize), 10);
            }
        };

        loadBatch(0, 60);

        return () => {
            imagesRef.current = [];
        };
    }, [totalFrames, framePath, drawFrame, getCurrentFrame]);

    // Scroll handler and resize handler
    useEffect(() => {
        resizeCanvas(); // Set initial dimensions
        targetFrameRef.current = getCurrentFrame(); // Set initial target frame

        const handleScroll = () => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const frameIndex = getCurrentFrame();
                targetFrameRef.current = frameIndex; // Update the target we want to reach

                if (frameIndex !== currentFrameRef.current) {
                    const success = drawFrame(frameIndex);
                    if (success) {
                        currentFrameRef.current = frameIndex;
                    }
                }
            });
        };

        const handleResize = () => {
            resizeCanvas();
            // Force a redraw of the current frame on resize
            if (currentFrameRef.current >= 0) {
                drawFrame(currentFrameRef.current);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(rafRef.current);
        };
    }, [totalFrames, drawFrame, getCurrentFrame, resizeCanvas]);

    return (
        <div
            id="canvas-container"
            ref={containerRef}
            style={{ height: `${scrollHeight}vh` }}
            className="relative"
        >
            <div className="sticky top-0 h-[100dvh] w-full bg-[#1a1210]">
                <canvas
                    ref={canvasRef}
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}
