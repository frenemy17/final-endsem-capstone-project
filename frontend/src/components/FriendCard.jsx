import { Link } from "react-router-dom";
import { School, GitBranch, MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const FriendCard = ({ friend }) => {
  return (
    <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-card to-card/90">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={friend.profilePic} alt={friend.fullName} />
            <AvatarFallback>{friend.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {friend.college && (
            <Badge variant="secondary" className="text-xs">
              <School className="size-3 mr-1" />
              {friend.college}
            </Badge>
          )}
          {friend.branch && (
            <Badge variant="outline" className="text-xs">
              <GitBranch className="size-3 mr-1" />
              {friend.branch}
            </Badge>
          )}
        </div>

        <Button asChild size="sm" className="w-full">
          <Link to={`/chat/${friend._id}`}>
            <MessageCircle className="size-4 mr-2" />
            Message
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
export default FriendCard;