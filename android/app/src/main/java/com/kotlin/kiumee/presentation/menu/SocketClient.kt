package com.kotlin.kiumee.presentation.menu

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import timber.log.Timber
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.net.InetSocketAddress
import java.net.Socket
import java.nio.charset.Charset

object SocketClient {
    private const val ip = "34.64.198.63"
    private const val port = 5000

    private lateinit var socket: Socket
    private lateinit var menuActivity: MenuActivity

    fun connect(activity: MenuActivity) {
        menuActivity = activity

        GlobalScope.launch(Dispatchers.IO) {
            try {
                socket = Socket()
                socket.connect(InetSocketAddress(ip, port))
                Timber.tag("voice").d("Socket connected")

                // 소켓 연결 후 데이터 수신을 위한 스레드 시작
                startSocketReader()
            } catch (e: IOException) {
                Timber.tag("voice").e("Socket connection error: ${e.message}")
            }
        }
    }

    private fun startSocketReader() {
        try {
            Thread {
                Timber.tag("voice").d("데이터 받는 중!")
                val inputStream = socket.getInputStream()

                if (inputStream != null) {
                    val byteArrayOutputStream = ByteArrayOutputStream()

                    val buffer = ByteArray(1024)
                    var bytesRead: Int
                    while (inputStream.read(buffer).also { bytesRead = it } != -1) {
                        Timber.tag("voice").d("루프 돌고 있음!")
                        byteArrayOutputStream.write(buffer, 0, bytesRead)
                        val byteArray = byteArrayOutputStream.toByteArray()
                        val decodedString = String(byteArray, Charset.forName("UTF-8"))
                        Timber.tag("voice").d("서버로부터 받은 데이터 decodedString : $decodedString")
                    }
                }
            }.start()
        } catch (e: IOException) {
            Timber.tag("voice").e("Error reading from server: ${e.message}")
        }

//        GlobalScope.launch(Dispatchers.IO) {
//            try {
//                while (true) {
//                    Timber.tag("voice").d("데이터 받는 중!")
//                    val inputStream = socket.getInputStream()
//
//                    if (inputStream != null) {
//                        Timber.tag("voice").d("서버로부터 받은 데이터 inputStream : $inputStream")
//                        val byteArrayOutputStream = ByteArrayOutputStream()
//                        Timber.tag("voice")
//                            .d("서버로부터 받은 데이터 byteArrayOutputStream : $byteArrayOutputStream")
//
//                        val buffer = ByteArray(1024)
//                        var bytesRead: Int
//                        while (inputStream.read(buffer).also { bytesRead = it } != -1) {
//                            Timber.tag("voice").d("루프 돌고 있음!")
//                            byteArrayOutputStream.write(buffer, 0, bytesRead)
//                        }
//
//                        val byteArray = byteArrayOutputStream.toByteArray()
//                        Timber.tag("voice").d("서버로부터 받은 데이터 byteArray : $byteArray")
//                        val decodedString = String(byteArray, Charset.forName("UTF-8"))
//                        Timber.tag("voice").d("서버로부터 받은 데이터 decodedString : $decodedString")
//                    }
//                }
//
//
//            val dd = socket.getInputStream()
//            Timber.tag("voice").d("서버로부터 받은 데이터 dd : $dd")
//            val reader = BufferedReader(InputStreamReader(dd))
//            Timber.tag("voice").d("서버로부터 받은 데이터 reader : $reader")
//            var line: String? //            while (reader.readLine().also { line = it } != null) {
//                String(reader, Charsets.UTF_8)
//                Timber.tag("voice").d("서버로부터 받은 데이터 line : $line")
//                   line?.let { text ->
//                       menuActivity.addChatItem(ChatEntity(VIEW_TYPE_USER, text))
//                }
//            }
//           Timber.tag("voice").d("서버로부터 받은 데이터 end")
//            } catch (e: IOException) {
//                Timber.tag("voice").e("Error reading from server: ${e.message}")
//            }
//        }
    }

    fun sendAudio(audioData: ByteArray) {
        try {
            socket.getOutputStream().write(audioData)
        } catch (e: Exception) {
            Timber.tag("voice").e("Error sending audio: ${e.message}")
        }
    }

    fun disconnect() {
        try {
            Timber.tag("voice").d("Socket disconnect")
            socket.close()
        } catch (e: Exception) {
            Timber.tag("voice").e("Error closing socket: ${e.message}")
        }
    }
}
