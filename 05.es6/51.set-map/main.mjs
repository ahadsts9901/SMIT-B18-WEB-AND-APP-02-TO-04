const my_arr = [1, 2, 3, 3, 4, 5, 5, 1, 7, 2, 3, 4, 5]
// console.log(my_arr)

const my_obj = {
    name: "jumbo",
    father: "uncle john",
    age: 90,
}

// console.log(my_obj)

// set
const my_set = new Set()
my_set.add(1)
my_set.add(2)
my_set.add(2)
my_set.add(2)
my_set.add(3)
my_set.add(3)
my_set.add(4)
my_set.add(5)
my_set.add(6)
my_set.add(6)
my_set.add(6)
my_set.add(6)
my_set.delete(5)
my_set.add(true)
my_set.add(false)
my_set.add("saylani")
my_set.add("saylani")
my_set.add([1, 2])
my_set.add([1, 2])

console.log("my_set==>", my_set)

const arr1 = [1, 2, 3]
const arr2 = arr1
console.log(arr1 == arr2)
