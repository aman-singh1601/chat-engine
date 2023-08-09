import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

import Sheetcontainer from "../ui/sheet__";

const SheetButton = () => {
  return (
    <>
      <Sheetcontainer>
        <Button
          className="search_user px-2 border-none duration-300 active:bg-white"
          variant="ghost"
        >
          <Search className="h-4 w-4 mr-2" />
          Search User
        </Button>
      </Sheetcontainer>
    </>
  );
};

export default SheetButton;
