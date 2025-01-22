
const QuickStatCard = ({ title, value, change, type = 'positive' }) => (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 text-sm font-medium ${
          type === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </p>
      </div>
    </div>
  );

  export default QuickStatCard