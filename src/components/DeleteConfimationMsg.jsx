import { useContext } from "react";
import { myContext } from "../myContext";
import { useNavigate } from "react-router";

export function DeleteConfimationMsg({ name, rollNo }) {
  const { dispatch } = useContext(myContext);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">Delete student</h2>
        <p className="mt-3 text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">{name}</span>? This
          can't be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
            onClick={() => {
              dispatch({ type: "DELETE", payload: rollNo });

              
              navigate("/studentlist");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
