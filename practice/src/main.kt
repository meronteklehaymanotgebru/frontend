fun main() {
//    var fullName="Meron Teklehaymanot"
//    var age="22"
//    var phoneNumber="0943711136"
//    var weight="52 KG"
//    val iskenyan=false
//    val isnotkenyan=true
//    print("Full name: $fullName\n Age: $age\n Phone number: $phoneNumber\n Weight: $weight\n Citizen:kenyan- $isnotkenyan\n")
//
//    var result=printRemainder(15,7)
//    println(result)
//    var result2 =printAdd()
//    println( result2)
//    printName()
//    var result1=printAdd(8.5,9.0,0.0,7.2)
//    println(result2)
    esther()
}
fun printName(){
    println("Enter your name:")
    var Name:String=readln()
    println("Hello ${Name}")
}
fun printRemainder(num1:Int,num2:Int): Int{
    var remainder= num1%num2
    return remainder
}
//fun printSum() {
//    println("Enter four numbers:")
//    var a= readln()!!.toInt()
//    var b=readln()!!.toInt()
//    var c=readLine()!!.toInt()
//    var d=readln()!!.toInt()
//    var sum =a+b+c+d
//    println( "The sum of the numbers is "+sum)
//
//}
fun printAdd(): Double{
    println("Enter four numbers:")
    var a= readln()!!.toDouble()
    var b=readln()!!.toDouble()
    var c=readLine()!!.toDouble()
    var d=readln()!!.toDouble()
    var sum =a+b+c+d
    return sum

}
fun esther(){
    var name="nyammbura"
    println("my name is     "+name)
}
