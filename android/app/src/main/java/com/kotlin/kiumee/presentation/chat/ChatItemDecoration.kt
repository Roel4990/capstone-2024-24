package com.kotlin.kiumee.presentation.chat

import android.content.Context
import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.core.util.context.pxToDp

class ChatItemDecoration(val context: Context) : RecyclerView.ItemDecoration() {
    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        super.getItemOffsets(outRect, view, parent, state)
        val position = parent.getChildAdapterPosition(view)

        if (position == 0) {
            outRect.top = context.pxToDp(15)
            outRect.bottom = context.pxToDp(10)
        } else if (position != -1) {
            outRect.bottom = context.pxToDp(10)
        } else {
            outRect.bottom = context.pxToDp(15)
        }
    }
}
