package server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.scalar.db.exception.transaction.TransactionException;
import java.io.IOException;

@RestController
public class LoadInitialDataController {

    @GetMapping("/load")
    public String loadInitialData() throws Exception {
        try (Repository repository = new Repository()) {
            repository.loadInitialData();
            return "{}";
        }
    }
}
