export default function Modal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl shadow-lg w-full sm:w-96">
        <h2 className="text-lg font-semibold">Modal Title</h2>
        <p className="text-neutral-500 text-sm mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          accumsan, mauris nec vehicula lacinia, n
        </p>
        <div className="flex justify-end mt-4">
          <button className="text-sm text-neutral-500 hover:text-neutral-600">
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-700 transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
