export function compressSourceFile(file: SourceFile): Promise<Blob> {
  const textStream = new Blob([JSON.stringify(file)]).stream();
  const compressedStream = textStream.pipeThrough(new CompressionStream('gzip'));

  return new Response(compressedStream).blob();
}

export function decompressSourceFile(file: File): Promise<SourceFile> {
  return new Promise((resolve) => {
    const decompressedStream = file.stream().pipeThrough(new DecompressionStream('gzip'));

    new Response(decompressedStream).blob().then((blob) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(JSON.parse(reader.result as string) as SourceFile);
      };

      reader.readAsText(blob);
    });
  });
}
