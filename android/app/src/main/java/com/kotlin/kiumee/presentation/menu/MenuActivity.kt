package com.kotlin.kiumee.presentation.menu

import android.content.Intent
import android.view.View
import androidx.activity.viewModels
import androidx.lifecycle.flowWithLifecycle
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.LinearSmoothScroller
import androidx.recyclerview.widget.RecyclerView
import com.kotlin.kiumee.R
import com.kotlin.kiumee.core.base.BindingActivity
import com.kotlin.kiumee.core.view.UiState
import com.kotlin.kiumee.databinding.ActivityMenuBinding
import com.kotlin.kiumee.presentation.menu.cart.CartAdapter
import com.kotlin.kiumee.presentation.menu.cart.CartEntity
import com.kotlin.kiumee.presentation.menu.cart.CartItemDecorator
import com.kotlin.kiumee.presentation.menu.chat.Chat
import com.kotlin.kiumee.presentation.menu.chat.ChatAdapter
import com.kotlin.kiumee.presentation.menu.chat.ChatItemDecorator
import com.kotlin.kiumee.presentation.menu.chat.guidebtn.GuideBtnAdapter
import com.kotlin.kiumee.presentation.menu.chat.guidebtn.GuideBtnItemDecorator
import com.kotlin.kiumee.presentation.menu.menuviewpager.MenuViewPagerAdapter
import com.kotlin.kiumee.presentation.menu.tab.TabAdapter
import com.kotlin.kiumee.presentation.menu.tab.TabItemDecorator
import com.kotlin.kiumee.presentation.orderfinish.OrderFinishActivity
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import timber.log.Timber

class MenuActivity : BindingActivity<ActivityMenuBinding>(R.layout.activity_menu) {
    private val menuViewModel by viewModels<MenuViewModel>()
    private val smoothScroller: RecyclerView.SmoothScroller by lazy {
        object : LinearSmoothScroller(this) {
            override fun getVerticalSnapPreference() = SNAP_TO_START
        }
    }
    private val cartList = mutableListOf<CartEntity>()
    var clicked = true
    private var lastClickedPosition: Int = 0

    override fun initView() {
        initChatAdapter()
        initGuideAdapter()
        initLayoutState()

        initObserveGetMenu()
        initObservePutBilling()

        initOrderBtnClickListener()
        initSpeakBtnClickListener()
        initCloseBtnClickListener()
    }

    private fun initSpeakBtnClickListener() {
        binding.btnMenuSpeak.setOnClickListener {
            // 여기에 음성 인식 추가
            if (clicked) {
                clicked = false
                binding.btnMenuSpeak.setBackgroundResource(R.drawable.shape_secondary_fill_circle)
                binding.btnMenuSpeak.text = "대화\n끄기"
            } else {
                clicked = true
                binding.btnMenuSpeak.setBackgroundResource(R.drawable.shape_point_fill_circle)
                binding.btnMenuSpeak.text = "대화\n켜기"
            }
        }
    }

    private fun initObserveGetMenu() {
        menuViewModel.getMenu.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> initTabAdapter(it.data)
                is UiState.Failure -> Timber.d("실패 : $it")
                is UiState.Loading -> Timber.d("로딩중")
                is UiState.Empty -> Timber.d("empty")
            }
        }.launchIn(lifecycleScope)
    }

    private fun initTabAdapter(tabData: List<CategoryEntity>) {
        with(binding) {
            vpMenuMenu.adapter = MenuViewPagerAdapter(supportFragmentManager, lifecycle, tabData)
            rvMenuTabContent.adapter = TabAdapter(click = { _, position ->
                layoutMenuMenu.visibility = View.VISIBLE
                layoutMenuChat.visibility = View.GONE
                lastClickedPosition = position
                vpMenuMenu.adapter =
                    MenuViewPagerAdapter(supportFragmentManager, lifecycle, tabData)
                vpMenuMenu.currentItem = position
            }).apply {
                submitList(tabData)
            }

            vpMenuMenu.isUserInputEnabled = false // 스와이프해서 탭 아이템 넘어가는 것을 허용할 것인지?
            rvMenuTabContent.addItemDecoration(TabItemDecorator(this@MenuActivity))
        }
    }

    private fun initCloseBtnClickListener() {
        binding.tvMenuMenuClose.setOnClickListener {
            binding.layoutMenuMenu.visibility = View.GONE
            binding.layoutMenuChat.visibility = View.VISIBLE
        }
    }

    private fun initOrderBtnClickListener() {
        binding.btnMenuCartOrder.setOnClickListener {
            if (cartList.isNotEmpty()) {
                cartList.map { it.toRequestBillingItemsDto() }.let { menuViewModel.putBilling(it) }
            }
        }
    }

    private fun initObservePutBilling() {
        menuViewModel.putBilling.flowWithLifecycle(lifecycle).onEach {
            when (it) {
                is UiState.Success -> startActivity(Intent(this, OrderFinishActivity::class.java))
                is UiState.Failure -> Unit
                is UiState.Empty -> Unit
                is UiState.Loading -> Unit
            }
        }.launchIn(lifecycleScope)
    }

    private fun initLayoutState() {
        // 추후 코드 변경 필요
        if (cartList.isNotEmpty()) {
            with(binding) {
                rvMenuCart.visibility = View.VISIBLE
                tvMenuCartEmpty.visibility = View.GONE
            }
            initCartAdapter()
        } else {
            initEmptyLayout()
        }
        initCartTotalPrice()
    }

    private fun initEmptyLayout() {
        with(binding) {
            rvMenuCart.visibility = View.GONE
            tvMenuCartEmpty.visibility = View.VISIBLE
        }
    }

    fun addCartItem(cartItem: CartEntity) {
        // 기존 cartList에 새로운 항목 추가
        cartList.add(cartItem)
        initLayoutState()
    }

    private fun initCartAdapter() {
        val cartAdapter = CartAdapter { cartItem ->
            cartList.remove(cartItem)
            initLayoutState()
        }
        binding.rvMenuCart.adapter = cartAdapter.apply {
            submitList(cartList)
        }

        if (binding.rvMenuCart.itemDecorationCount == 0) {
            binding.rvMenuCart.addItemDecoration(
                CartItemDecorator(this)
            )
        }

        initCartScrollPointer()
    }

    private fun initCartScrollPointer() {
        binding.rvMenuCart?.layoutManager?.startSmoothScroll(
            smoothScroller.apply {
                targetPosition = cartList.size - 1
            }
        )
    }

    private fun initCartTotalPrice() {
        // 카트 목록의 가격 합계 계산
        val totalPrice = cartList.sumOf { it.price }
        binding.tvMenuCartTotalPrice.text = "${totalPrice}원"
    }

    private fun initGuideAdapter() {
        binding.rvMenuChatGuide.adapter = GuideBtnAdapter().apply {
            submitList(listOf("대표 메뉴가 뭐야?", "화장실 어디에 있어?", "직원 호출해 줘."))
        }
        binding.rvMenuChatGuide.layoutManager =
            LinearLayoutManager(
                binding.rvMenuChatGuide.context,
                LinearLayoutManager.HORIZONTAL,
                false
            )
        binding.rvMenuChatGuide.addItemDecoration(GuideBtnItemDecorator(this))
    }

    private fun initChatAdapter() {
        binding.rvMenuChat.adapter = ChatAdapter().apply {
            submitList(
                listOf(
                    Chat(0, "키우미에게 대화를 시작해주세요!"),
                    Chat(1, "안녕."),
                    Chat(0, "안녕하세요!"),
                    Chat(1, "나는 배가 고파."),
                    Chat(1, "여기에서 가장 잘 나가는 메뉴가 뭐야?"),
                    Chat(0, "저희 매장의 대표 메뉴입니다.", listOf("아이스 아메리카노", "아이스 돌체라떼", "티라미수 케익")),
                    Chat(1, "화장실 가고싶어."),
                    Chat(0, "저희 매장에서 화장실은 안쪽 계단 맞은 편에 있습니다."),
                    Chat(1, "알려줘서 고마워."),
                    Chat(1, "오늘 날씨 좋다."),
                    Chat(0, "무슨 말인지 모르겠어요."),
                    Chat(1, "떡볶이가 있니?"),
                    Chat(0, "네. 저희 매장에서는 미도인 우실장 떡볶이를 제공하고 있습니다.")
                )
            )
        }
        binding.rvMenuChat.layoutManager =
            LinearLayoutManager(binding.rvMenuChat.context, LinearLayoutManager.VERTICAL, false)
        binding.rvMenuChat.addItemDecoration(ChatItemDecorator(this))
    }

    fun getLastClickedPosition(): Int {
        return lastClickedPosition
    }
}
