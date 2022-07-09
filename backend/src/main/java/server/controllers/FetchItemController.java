package server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.scalar.db.exception.transaction.TransactionException;
import java.io.IOException;
import com.scalar.db.api.Result;
import java.util.ArrayList;

@RestController
public class FetchItemController {

    @GetMapping("/items/{itemId}")
    public ItemDto fetchItems(@PathVariable("itemId") int itemId) throws Exception {
        try (Repository repository = new Repository()) {
            return repository.getItem(itemId);
        }
    }
}
