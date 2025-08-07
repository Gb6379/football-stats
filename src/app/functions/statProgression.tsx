function StatProgression({
  title,
  data,
  label,
  icon,
}: {
  title: string;
  data: (string | number)[];
  label?: string;
  icon?: React.ReactNode;
}) {
  const numericData = data
    .map((v) => (typeof v === "number" ? v : parseFloat(String(v))))
    .filter((v) => !isNaN(v));

  const average =
    numericData.length > 0
      ? (numericData.reduce((a, b) => a + b, 0) / numericData.length).toFixed(2)
      : null;

  return (
    <div
      className="my-4 p-3 rounded shadow"
      style={{ minWidth: 100, backgroundColor: "#272C32" }}
    >
      <h2 className="h5 d-flex align-items-center gap-2 mb-3 barlow-condensed-regular-white">
        {icon && <span className="fs-4">{icon}</span>}
        {title}
      </h2>

      <div
        className="d-flex flex-wrap gap-2 justify-content-center"
        style={{
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {data.map((val, idx) => (
          <div
            key={idx}
            className="d-flex flex-column align-items-center justify-content-center bg-white border border-secondary rounded shadow px-2 py-1"
            style={{
              width: 80,
              height: 60,
              fontWeight: 600,
              color: "#000000",
              gap: "4px",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flexShrink: 0,
            }}
            title={label ? `${val} ${label}` : `${val}`}
          >
            <span>{val}</span>
            {label && <span className="text-muted small">{label}</span>}
          </div>
        ))}
      </div>

      {average !== null && (
        <div className="text-center small mt-1 barlow-condensed-regular-white">
          Média: {average} {label || ""}
        </div>
      )}
    </div>
  );
}

export default StatProgression;
