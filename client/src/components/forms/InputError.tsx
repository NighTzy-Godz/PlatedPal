import React from "react";

function InputError({ errMsg }: { errMsg?: string }) {
  return <p className="text-error text-sm font-medium mt-1">{errMsg}</p>;
}

export default InputError;
