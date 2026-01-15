const FacultyLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-lg font-bold">Faculty Panel</h2>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
};

export default FacultyLayout;
