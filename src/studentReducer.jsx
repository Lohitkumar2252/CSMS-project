export function studentReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "DELETE":
      return state.filter((s) => s.rollNo !== action.payload);

    case "UPDATE":
      return state.map((s) =>
        s.rollNo === action.payload.rollNo
          ? { ...s, ...action.payload }
          : s
      );

    default:
      return state;
  }
}