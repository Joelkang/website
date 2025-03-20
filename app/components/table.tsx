export function Table({
  data,
}: {
  data: {
    headers: React.ReactNode[];
    rows: React.ReactNode[][];
  };
}) {
  const headers = data.headers.map((header, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: index is correct here
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: index is correct here
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: cellIndex is correct here
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}


