'use client'
import UserSearchBar from "@/components/User/SearchBar";
import UsersList from "@/components/User/UsersList";

export default function UsersView() {
    const handleSearch = (userId: string) => {
        console.log('Searching for task:', userId);
    }

    return (
        <div className="flex flex-col p-4 w-full">
            <div className="flex justify-end mx-auto mb-8 w-5/6">
                <div className="w-80">
                    <UserSearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="desktop:w-5/6 laptop:w-5/6 mx-auto w-full">
                <UsersList />
            </div>
        </div>
    );
}