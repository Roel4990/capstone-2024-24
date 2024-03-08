package com.kotlin.kiumee.presentation.menucartselect

import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingFragment
import com.kotlin.kiumee.databinding.FragmentMenuCartSelectBinding
import com.kotlin.kiumee.presentation.orderfinish.OrderFinishFragment

class MenuCartSelectFragment :
    BindingFragment<FragmentMenuCartSelectBinding>(R.layout.fragment_menu_cart_select) {
    override fun initView() {
        binding.btnMenuCartSelectTest.setOnClickListener {
            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace(R.id.fcv_chat, OrderFinishFragment())
                addToBackStack(null) // 뒤로 가기 동작을 위해 백스택에 추가
                commit()
            }
        }
    }
}
