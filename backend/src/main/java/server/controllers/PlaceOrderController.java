package server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.scalar.db.exception.transaction.TransactionException;
import java.io.IOException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class PlaceOrderController {

    @RequestMapping(value = "/order", method = RequestMethod.POST)

    public String placeOrder(@RequestBody PlaceOrderRequestDto orderDto) throws Exception {
        try (Repository repository = new Repository()) {
            return repository.placeOrder(
                    orderDto.getCustomerId(),
                    orderDto.getItemIds(),
                    orderDto.getItemCounts()
            );
        }
    }
}
