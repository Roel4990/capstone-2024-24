from typing import Optional


class DefaultException(Exception):
    """
    RFC 7807 Problem Details
    """

    def __init__(self, detail: Optional[str], status_code: int, type_: str):
        self.detail = detail
        self.status_code = status_code
        self.type = type_

    def __dict__(self) -> dict:
        return {"detail": self.detail, "type": self.type}
