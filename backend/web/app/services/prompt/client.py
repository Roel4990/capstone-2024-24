from typing import List

import anthropic
from fastapi import Depends

from app.core.config import get_app_settings
from app.core.settings.app import AppSettings
from app.models.domain.orders import ModelQuery


class Client:
    def __init__(self, setting: AppSettings = Depends(get_app_settings)):
        self.client = anthropic.Client(api_key=setting.ANTHROPIC_KEY)

    def send_query(
        self, system_prompt: str, query_histories: List[ModelQuery], query: str
    ) -> str:
        messages = []

        for query_history in query_histories:
            messages.append({"role": "user", "content": query_history.query})
            messages.append(
                {
                    "role": "assistant",
                    "content": query_history.response if query_history.response else "",
                }
            )

        messages.append({"role": "user", "content": query})

        response = self.client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1024,
            system=system_prompt,
            messages=messages,
        )

        return response.content[0].text
