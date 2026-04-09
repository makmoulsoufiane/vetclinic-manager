const Loading = ({ message = 'Chargement...' }) => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#c8def5] border-t-[#173d70]" />
      <p className="text-sm font-medium tracking-[0.12em] text-slate-500 uppercase">{message}</p>
    </div>
  );
};

export default Loading;
