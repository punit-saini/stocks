import StockTable from '../../components/StockTable';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-200 lg:p-15 md:p-10 sm:p-4">
      <div id='main-container' className="w-full mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Stocks Data</h1>
        <StockTable
         />
      </div>
    </main>
  );
}
