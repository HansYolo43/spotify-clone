import Header from "@/components/Header"
import ListItem from "@/components/Listitem"

export default function Home() {
  return (
    <div className="text-white , bg-neutral-900 rounded-lg h-full w-full overflow-hidden overlow-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            Welcome Back
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">

            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
            href="liked"></ListItem>
            </div>
       </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semifold">
            Newest Songs
          </h1>
        </div>
        <div> 
          List of Songs
        </div>
      </div>
    </div>
  )
}


